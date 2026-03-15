import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import theme from "../theme/theme.ts";

interface BreadcrumbItem {
  label: string;
  path: string;
}

export function AppBreadcrumbs() {
  const location = useLocation();
  const { t } = useTranslation();

  const pathnames = location.pathname.split("/").filter((x) => x);

  const routeLabels: Record<string, string> = {
    "": t("navigation.home"),
    pitches: t("navigation.pitches"),
    locations: t("navigation.locations"),
    login: t("auth.login"),
    register: t("auth.register"),
  };

  const getBreadcrumbLabel = (path: string): string => {
    return routeLabels[path] || path.charAt(0).toUpperCase() + path.slice(1);
  };

  const breadcrumbs: BreadcrumbItem[] = [
    {
      label: t("navigation.home"),
      path: "/",
    },
  ];

  let currentPath = "";
  pathnames.forEach((pathname, index) => {
    currentPath += `/${pathname}`;

    if (index < pathnames.length - 1) {
      breadcrumbs.push({
        label: getBreadcrumbLabel(pathname),
        path: currentPath,
      });
    }
  });

  const lastSegment = pathnames[pathnames.length - 1] || "";
  const currentPageLabel = getBreadcrumbLabel(lastSegment);

  // Don't show breadcrumbs on home page
  if (location.pathname === "/") {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        py: 2,
        alignItems: "center",
        background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.primary.main}15 100%)`,
      }}
    >
      <Breadcrumbs aria-label="breadcrumb" separator="/">
        {breadcrumbs.map((breadcrumb, index) => (
          <Link
            key={index}
            component={RouterLink}
            to={breadcrumb.path}
            underline="hover"
            color="inherit"
            sx={{ fontWeight: "700", cursor: "pointer" }}
          >
            {breadcrumb.label}
          </Link>
        ))}
        <Typography
          sx={{
            color: theme.palette.primary.main,
            fontWeight: "700",
          }}
        >
          {currentPageLabel}
        </Typography>
      </Breadcrumbs>
    </Box>
  );
}

