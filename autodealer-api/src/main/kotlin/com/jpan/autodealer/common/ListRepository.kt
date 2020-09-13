package com.jpan.autodealer.common

interface ListRepository<T> {
    fun listAll(): List<T>
}