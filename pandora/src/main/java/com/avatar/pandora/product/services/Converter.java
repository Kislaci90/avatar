package com.avatar.pandora.product.services;

public interface Converter<E,V,F> {
    V convertToView(E e);
    E convertToEntity(E e, F f);
    E convertToNewEntity(F f);
}
