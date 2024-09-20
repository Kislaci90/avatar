package com.avatar.product.services;

import com.avatar.product.models.field.Field;
import com.avatar.product.models.location.*;
import graphql.relay.DefaultPageInfo;
import graphql.relay.PageInfo;
import lombok.Builder;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.locationtech.jts.geom.PrecisionModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LocationConverter implements Converter<Location, LocationView, LocationForm> {

    @Autowired
    private PointConverter pointConverter;

    @Autowired
    private FieldConverter fieldConverter;

    public LocationView convert(Location location) {
        return new LocationView(location.getId(), location.getName(), location.getAddress(), pointConverter.convert(location.getGeom()), fieldConverter.convert(location.getFields()));
    }

    public Location convert(Location location, LocationForm locationForm) {
        location.setName(locationForm.getName());
        location.setAddress(locationForm.getAddress());
        location.setGeom(pointConverter.convert(location.getGeom(), locationForm.getGeom()));
        locationForm.getFields().forEach(f -> location.addField(fieldConverter.convert(new Field(), f)));
        return location;
    }
}
