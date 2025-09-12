package com.avatar.pandora.product.services;

import com.avatar.pandora.product.models.user.RegisterUser;
import com.avatar.pandora.product.models.user.User;
import com.avatar.pandora.product.models.user.UserView;
import org.springframework.stereotype.Service;

@Service
public class UserConverter implements Converter<User, UserView, RegisterUser>{

    @Override
    public UserView convertToView(User user) {
        return new UserView(user.getId(), user.getFullName(), user.getEmail(), user.getUsername());
    }

    @Override
    public User convertToEntity(User user, RegisterUser registerUser) {
        return null;
    }

    @Override
    public User convertToNewEntity(RegisterUser registerUser) {
        return null;
    }
}
