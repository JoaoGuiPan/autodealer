package com.jpan.autodealer.model

data class CarModelFilter(
        var minYear: Int? = null,
        var maxYear: Int? = null,
        var make: List<Long>? = null
) {
    fun getBrandList(): List<Long>? {
        if (make.isNullOrEmpty()) {
            return null;
        }
        return make
    }
}