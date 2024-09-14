package com.avatar.product.services;

import com.avatar.product.models.field.Field;
import com.avatar.product.models.field.FieldForm;
import com.avatar.product.models.field.FieldView;
import com.avatar.product.repositories.FieldRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@Service
public class FieldService {

    @Autowired
    private FieldRepository fieldRepository;

    @Autowired
    private FieldConverter fieldConverter;

    public FieldView save(FieldForm fieldForm) {
        return fieldConverter.convert(fieldRepository.save(fieldConverter.convert(new Field(), fieldForm)));
    }

    public Set<FieldView> saveAll(List<FieldForm> fieldForms) {
        List<Field> fields = fieldForms.stream()
                .map(f -> fieldConverter.convert(new Field(), f))
                .collect(Collectors.toList());
        return fieldConverter.convert(fieldRepository.saveAll(fields));
    }
}
