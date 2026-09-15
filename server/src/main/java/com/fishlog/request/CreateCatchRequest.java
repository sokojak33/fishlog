package com.fishlog.request;

public record CreateCatchRequest(
        String species,
        String location,
        String date,
        double length) {
}
