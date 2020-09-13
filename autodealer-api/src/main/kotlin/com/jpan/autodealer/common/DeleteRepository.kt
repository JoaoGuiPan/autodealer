package com.jpan.autodealer.common

interface DeleteRepository<T> {
    fun delete(entity: T)
}