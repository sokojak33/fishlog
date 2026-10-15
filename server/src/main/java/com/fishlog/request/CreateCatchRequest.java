package com.fishlog.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

public record CreateCatchRequest(
                @NotBlank String species,
                @NotBlank String location,
                @NotBlank String date,
                @Positive double length) {
}
