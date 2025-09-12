package com.avatar.pandora.product.models.location;

import io.soabase.recordbuilder.core.RecordBuilder;

import java.util.List;
import java.util.Properties;

@RecordBuilder
public record LocationFilter(String searchTerm, List<Properties> properties) {  }
