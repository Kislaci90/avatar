package com.avatar.pandora.product.services;

import com.avatar.pandora.product.models.user.User;
import com.avatar.pandora.product.models.user.UserView;
import com.avatar.pandora.product.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

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

    public Long countUsers() {
        return userRepository.count();
    }
}
