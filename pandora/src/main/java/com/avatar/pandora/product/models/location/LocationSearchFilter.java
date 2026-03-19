package com.avatar.pandora.product.models.location;

import java.util.Set;

public record LocationSearchFilter(Set<String> cities, Set<String> locationProperties) {
}
