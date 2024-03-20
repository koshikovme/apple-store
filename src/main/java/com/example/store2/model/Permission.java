package com.example.store2.model;

public enum Permission {
    USERS_WRITE("users:write"),
    USERS_READ("users:read");
    private final String permission;

    Permission(String permission) {
        this.permission = permission;
    }

    public String getPermission() {
        return permission;
    }
}
