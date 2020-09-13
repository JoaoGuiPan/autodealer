package com.jpan.autodealer.model

import java.math.BigDecimal
import javax.persistence.*
import javax.validation.constraints.Min
import javax.validation.constraints.NotBlank
import javax.validation.constraints.NotNull

@Entity
data class CarModel(
        @Id
        @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "car_model_seq")
        @SequenceGenerator(name = "car_model_seq", allocationSize = 1)
        var id: Long? = null,

        @field:NotNull
        @field:NotBlank
        @Column(unique = true)
        var name: String? = null,

        @ManyToOne
        @field:NotNull
        var brand: Brand? = null,

        @field:NotNull
        var version: String? = null,

        @field:Min(1800)
        @field:NotNull
        var year: Int? = null,

        @field:NotNull
        var price: BigDecimal? = null,

        @Enumerated(EnumType.STRING)
        val fuelType: FuelType? = null,

        @field:NotNull
        val fuelConsumptionKmPerL: BigDecimal? = null,

        @field:NotNull
        val annualMaintenanceCost: BigDecimal? = null
) {

        enum class FuelType {
                DIESEL, PETROL, HYDROGEN, HYBRID_DIESEL, HYBRID_PETROL, LPG, CNG, ELECTRIC, ETHANOL, OTHER
        }
}