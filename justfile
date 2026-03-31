# Avatar - Just Commands for Building and Deployment
# Install: https://github.com/casey/just
# Usage: just build-deploy

set shell := ["powershell", "-NoProfile", "-Command"]

# List all commands
default:
    @just --list

# ==================== SETUP COMMANDS ====================

# Check and setup Helm
setup-helm:
    @echo "Checking Helm installation..."
    @echo "Adding ArgoCD Helm repository..."
    @helm repo add argoproj https://argoproj.github.io/argo-helm --force-update
    @helm repo update
    @echo "✓ Helm setup complete"

# ==================== BUILD COMMANDS ====================

# Build backend image
build-backend:
    @echo "Building backend image (Pandora)..."
    cd pandora; docker build -t pandora:local .
    @echo "✓ Backend image built"

# Build frontend image
build-frontend:
    @echo "Building frontend image (Eva)..."
    cd eva; docker build -t eva:local .
    @echo "✓ Frontend image built"

# Build all images
build-all: build-backend build-frontend
    @echo "Verifying images..."
    @docker image ls | Select-String -Pattern "pandora|eva"
    @echo "✓ All images built successfully"

# ==================== LOCAL REGISTRY COMMANDS ====================

# Start local Docker registry (if not running)
registry-start:
    @echo "Starting local Docker registry on localhost:5000..."
    @docker run -d --name local-registry -p 5000:5000 registry:latest 2>$null; echo "✓ Registry already running"
    @echo "✓ Local registry is running on localhost:5000"

# Stop local Docker registry
registry-stop:
    @echo "Stopping local Docker registry..."
    @docker stop local-registry 2>$null; echo "Registry not running"
    @docker rm local-registry 2>$null
    @echo "✓ Local registry stopped"

# Push backend image to local registry
push-backend:
    @echo "Pushing backend image to localhost:5000..."
    @docker tag pandora:local localhost:5000/pandora:latest
    @docker push localhost:5000/pandora:latest
    @echo "✓ Backend image pushed"

# Push frontend image to local registry
push-frontend:
    @echo "Pushing frontend image to localhost:5000..."
    @docker tag eva:local localhost:5000/eva:latest
    @docker push localhost:5000/eva:latest
    @echo "✓ Frontend image pushed"

# Push all images to local registry
push-all: push-backend push-frontend
    @echo "✓ All images pushed to local registry"

# Build and push all images to local registry
build-push-all: build-all push-all
    @echo "✓ All images built and pushed successfully"

# ==================== TERRAFORM COMMANDS ====================

# Initialize Terraform
tf-init environment: setup-helm
    @echo "Initializing Terraform..."
    cd infra/terraform/environments/{{environment}}; terraform init

# Plan Terraform
tf-plan environment: (tf-init environment)
    @echo "Planning Terraform deployment..."
    cd infra/terraform/environments/{{environment}}; terraform plan -out=tfplan

# Apply Terraform
tf-apply environment: (tf-plan environment)
    @echo "Applying Terraform configuration..."
    cd infra/terraform/environments/{{environment}}; terraform apply tfplan
    @echo "✓ Terraform apply completed"

# Destroy Terraform
tf-destroy environment:
    @echo "Destroying Terraform resources..."
    cd infra/terraform/environments/{{environment}}; terraform destroy

# ==================== DEPLOYMENT COMMANDS ====================

# Build and deploy everything
build-deploy environment: build-all (tf-apply environment)
    @echo ""
    @echo "================================"
    @echo "✓ Deployment Complete!"
    @echo "================================"
    @echo ""
    @echo "Waiting for pods to start..."
    @Start-Sleep -Seconds 5
    @kubectl get pods -n avatar
    @echo ""
    @echo "Next steps:"
    @echo "  1. Port forward all services:"
    @echo "     just port-forward-all"
    @echo ""
    @echo "  2. Or forward individually:"
    @echo "     just port-forward-backend"
    @echo "     just port-forward-frontend"
    @echo "     just port-forward-database"
    @echo ""
    @echo "  3. Access applications:"
    @echo "     Backend GraphQL: http://localhost:8080/graphiql"
    @echo "     Frontend: http://localhost:3000"
    @echo ""
    @echo "  4. View logs:"
    @echo "     just logs-backend"
    @echo "     just logs-frontend"

# Full clean and redeploy
clean-deploy environment: cleanup (build-deploy environment)
    @echo "✓ Full clean deployment completed"

# Restart backend
restart-backend:
    @echo "Restarting backend..."
    @kubectl rollout restart deployment/pandora -n avatar
    @echo "✓ Backend restarting"

# Restart frontend
restart-frontend:
    @echo "Restarting frontend..."
    @kubectl rollout restart deployment/eva -n avatar
    @echo "✓ Frontend restarting"

# Restart database
restart-database:
    @echo "Restarting database..."
    @kubectl rollout restart statefulset/postgres -n avatar
    @echo "✓ Database restarting"

# ==================== CLEANUP COMMANDS ====================

# Delete k3d cluster
cleanup-cluster:
    @echo "Deleting k3d cluster..."
    k3d cluster delete avatar-local
    @echo "✓ k3d cluster deleted"

# Delete avatar namespace
cleanup:
    @echo "Deleting avatar namespace..."
    @kubectl delete namespace avatar
    @echo "✓ Namespace deleted"

# Delete ArgoCD namespace
cleanup-argocd:
    @echo "Deleting argocd namespace..."
    @kubectl delete namespace argocd
    @echo "✓ ArgoCD namespace deleted"

# Full cleanup (cluster and namespaces)
cleanup-all: cleanup cleanup-argocd cleanup-cluster
    @echo "✓ Full cleanup completed"