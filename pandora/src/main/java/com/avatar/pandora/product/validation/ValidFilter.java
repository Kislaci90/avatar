package com.avatar.pandora.product.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.*;

@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = FilterValidator.class)
@Documented
public @interface ValidFilter {
    String message() default "Filter is invalid. At least one filter criteria must be provided.";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
