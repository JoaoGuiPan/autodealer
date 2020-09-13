package com.jpan.autodealer.model

import javax.persistence.*
import javax.validation.constraints.NotBlank
import javax.validation.constraints.NotNull

@Entity
data class Brand(
        @Id
        @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "brand_seq")
        @SequenceGenerator(name = "brand_seq", allocationSize = 1)
        var id: Long? = null,

        @field:NotNull
        @field:NotBlank
        @Column(unique = true)
        val name: String? = null
)