package com.avatar.pandora.product.validation;

import com.avatar.pandora.product.models.Filter;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class FilterValidator implements ConstraintValidator<ValidFilter, Filter> {

    @Override
    public void initialize(ValidFilter constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(Filter filter, ConstraintValidatorContext context) {
        if (filter == null) {
            return true;
        }

        boolean hasSearchTerm = filter.getSearchTerm() != null && !filter.getSearchTerm().isBlank();
        boolean hasCities = filter.getCities() != null && !filter.getCities().isEmpty();
        boolean isValid = isIsValid(filter, hasSearchTerm, hasCities);

        if (!isValid) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(
                    "Filter must contain at least one search criterion (searchTerm, cities, properties, or pitch filters)")
                    .addConstraintViolation();
        }

        return isValid;
    }

    private static boolean isIsValid(Filter filter, boolean hasSearchTerm, boolean hasCities) {
        boolean hasLocationProperties = filter.getLocationProperties() != null && !filter.getLocationProperties().isEmpty();
        boolean hasPitchTypes = filter.getPitchTypes() != null && !filter.getPitchTypes().isEmpty();
        boolean hasSurfaceTypes = filter.getSurfaceTypes() != null && !filter.getSurfaceTypes().isEmpty();
        boolean hasProperties = filter.getProperties() != null && !filter.getProperties().isEmpty();

        return hasSearchTerm || hasCities || hasLocationProperties ||
                         hasPitchTypes || hasSurfaceTypes || hasProperties;
    }
}
