package com.avatar.pandora.user.services;

import com.avatar.pandora.user.api.UserServiceApi;
import com.avatar.pandora.user.models.user.User;
import com.avatar.pandora.user.models.user.UserView;
import com.avatar.pandora.user.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserServiceApi {

    private final UserConverter userConverter;
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserConverter userConverter, UserRepository userRepository) {
        this.userConverter = userConverter;
        this.userRepository = userRepository;
    }

    public UserView getMe() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        return userConverter.convertToView(currentUser);
    }

    @Override
    public Long countUsers() {
        return userRepository.count();
    }
}
