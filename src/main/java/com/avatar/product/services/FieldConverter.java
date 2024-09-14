package com.avatar.product.services;

import com.avatar.product.models.field.Field;
import com.avatar.product.models.field.FieldForm;
import com.avatar.product.models.field.FieldView;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class FieldConverter implements Converter<Field, FieldView, FieldForm> {

    @Override
    public FieldView convert(Field field) {
        return new FieldView(field.getId(), field.getName());
    }

    @Override
    public Field convert(Field field, FieldForm fieldForm) {
        field.setName(fieldForm.getName());
        return field;
    }

    public Set<FieldView> convert(List<Field> fields) {
        return fields.stream().map(this::convert).collect(Collectors.toSet());
    }
}
