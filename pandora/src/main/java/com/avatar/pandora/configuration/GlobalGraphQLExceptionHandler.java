package com.avatar.pandora.configuration;

import com.avatar.pandora.product.exceptions.DuplicateEmailException;
import graphql.GraphQLError;
import graphql.GraphqlErrorBuilder;
import graphql.schema.DataFetchingEnvironment;
import jakarta.validation.ValidationException;
import lombok.extern.slf4j.Slf4j;
import org.jspecify.annotations.NonNull;
import org.springframework.graphql.execution.DataFetcherExceptionResolverAdapter;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@Slf4j
public class GlobalGraphQLExceptionHandler extends DataFetcherExceptionResolverAdapter {

    @Override
    public GraphQLError resolveToSingleError(@NonNull Throwable ex, @NonNull DataFetchingEnvironment env) {
        log.error("Error: {}", ex.getMessage());
        if (ex instanceof DuplicateEmailException) {
            return GraphqlErrorBuilder.newError(env)
                    .message("ERR_DUPLICATE_EMAIL")
                    .extensions(Map.of("detail", ex.getMessage()))
                    .build();
        }

        if (ex instanceof IllegalArgumentException || ex instanceof ValidationException) {
            return GraphqlErrorBuilder.newError(env)
                    .message("ERR_INVALID_INPUT")
                    .extensions(Map.of("detail", ex.getMessage()))
                    .build();
        }

        return GraphqlErrorBuilder.newError(env)
                .message("ERR_INTERNAL_SERVER_ERROR")
                .build();
    }
}

