package com.avatar.product.services;

import org.springframework.stereotype.Service;

public interface Converter<E,V,F> {
    V convert(E e);
    E convert(E e, F f);
}
