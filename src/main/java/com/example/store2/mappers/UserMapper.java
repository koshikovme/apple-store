package com.example.store2.mappers;

import com.example.store2.dtos.SignUpDto;
import com.example.store2.dtos.UserDto;
import com.example.store2.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDto toUserDto(User user);

    @Mapping(target = "password", ignore = true)
    User signUpToUser(SignUpDto signUpDto);

}
