package com.avatar.pandora.product.services;

import com.avatar.pandora.product.models.location.PointForm;
import com.avatar.pandora.product.models.location.PointView;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.locationtech.jts.geom.PrecisionModel;
import org.springframework.stereotype.Service;

@Service
public class PointConverter implements Converter<Point, PointView, PointForm>{

    @Override
    public PointView convert(Point geom) {
        return new PointView(geom.getX(), geom.getY());
    }

    @Override
    public Point convert(Point point, PointForm geom) {
        GeometryFactory geometryFactory = new GeometryFactory(new PrecisionModel(), 4326);
        return geometryFactory.createPoint(new Coordinate(geom.x(),geom.y()));
    }

}
