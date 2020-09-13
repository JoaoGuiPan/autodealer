package com.jpan.autodealer.common

interface UpdateService<E, P> {
    fun update(entity: E, payload: P): E
}