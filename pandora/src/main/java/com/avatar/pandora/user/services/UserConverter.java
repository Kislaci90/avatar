package com.avatar.pandora.user.services;

import com.avatar.pandora.user.models.user.RegisterUserInput;
import com.avatar.pandora.user.models.user.User;
import com.avatar.pandora.user.models.user.UserView;
import com.avatar.pandora.shared.Converter;
import org.springframework.stereotype.Service;

@Service
public class UserConverter implements Converter<User, UserView, RegisterUserInput> {

    @Override
    public UserView convertToView(User user) {
        return new UserView(user.getId(), user.getFirstName(), user.getLastName(), user.getEmail());
    }

    @Override
    public User convertToEntity(User user, RegisterUserInput registerUserInput) {
        return null;
    }

    @Override
    public User convertToNewEntity(RegisterUserInput registerUserInput) {
        return null;
    }
}
