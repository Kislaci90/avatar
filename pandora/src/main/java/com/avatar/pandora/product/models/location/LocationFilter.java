package com.avatar.pandora.product.models.location;

import io.soabase.recordbuilder.core.RecordBuilder;

@RecordBuilder
public record LocationFilter(String searchTerm) {  }
