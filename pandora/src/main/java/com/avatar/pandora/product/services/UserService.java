package com.avatar.pandora.product.services;

import com.avatar.pandora.product.models.user.User;
import com.avatar.pandora.product.models.user.UserView;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserConverter userConverter;

    public UserService(UserConverter userConverter) {
        this.userConverter = userConverter;
    }

    public UserView getMe() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        return userConverter.convertToView(currentUser);
    }
}
