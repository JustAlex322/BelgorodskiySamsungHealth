package com.example.reg3.Service;

import com.example.reg3.LogBot.TelegramBot;
import com.example.reg3.dao.User;
import com.example.reg3.dao.UserRegistrationData;
import com.example.reg3.repository.UserRegistrationDataRepository;
import com.example.reg3.requastion.UserRegistrationDataRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.SecretKeySpec;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Optional;
import java.util.Properties;

@Service
public class UserRegistrationDataService {
    @Autowired
    TelegramBot bot;
    private final SecretKeySpec key;
    String algorithm;

    {
        System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!DOCKER PLease!!!!!!!!!!!!!!!!!!!!!!\n\n\n\n\n\n\n\n\n\n\n");
        //Properties props = new Properties();
        String keyOfCipher = "??????2020??-202";
        algorithm = "AES";

        key = new SecretKeySpec(keyOfCipher.getBytes(), algorithm);
    }

    Cipher cipher;

    {
        try {

            cipher = Cipher.getInstance(algorithm);
            cipher.init(Cipher.ENCRYPT_MODE, key);

        } catch (NoSuchPaddingException | NoSuchAlgorithmException | InvalidKeyException e) {
            bot.sendError("Ошибка при создания ключа шифрования \n Текст ошибки: " + e.getMessage());

            throw new RuntimeException(e);
        }
    }


    private final UserRegistrationDataRepository userRepository;


    @Autowired
    public UserRegistrationDataService(UserRegistrationDataRepository
                                               userRepository) {
        this.userRepository = userRepository;
    }

    public String cipherStrWithLocalKey(String password) {
        try {
            return new String(cipher.doFinal(password.getBytes()));
        } catch (IllegalBlockSizeException | BadPaddingException e) {
            throw new RuntimeException(e);
        }
    }

    public List<UserRegistrationData> getUsers() {
        bot.sendInfo("Получение информации всех пользователей");

        return userRepository.findAll();
    }


    public UserRegistrationDataRequest addNewUser(UserRegistrationData userOfApp) {
        bot.sendInfo("Добавление нового пользователя \n" +
                "email: " + userOfApp.getEmail() + "\n" +
                "логин: " + userOfApp.getLogin() + "\n" +
                "Админский доступ: " + userOfApp.getIsAdmin() + "\n");

        bot.sendInfo("Поиск пользователя с email " + userOfApp.getEmail() + "\n");
        Optional<UserRegistrationData> userOptional =
                userRepository.findUserRegistrationDataByEmail(userOfApp.getEmail());

        if (userOptional.isPresent()) {
            bot.sendWarning("email  " + userOfApp.getEmail() + " занят");
            return new UserRegistrationDataRequest(1, "email занят", userOfApp);
        } else {
            try {
                if (userOfApp.getIsAdmin() == null) userOfApp.setIsAdmin(false);


                userOfApp = saveNewUser(userOfApp);
                bot.sendInfo("Успешная регистрация пользователя с   " + userOfApp.getId() + " id" +
                        "email: " + userOfApp.getEmail());

                return new UserRegistrationDataRequest(0, "регистрация прошлва успешно", userOfApp);
            } catch (IllegalBlockSizeException | BadPaddingException e) {
                bot.sendError("Непредвиденная ошибка   " + e.getMessage());
                throw new RuntimeException(e);
            }
        }
    }

    private UserRegistrationData saveNewUser(UserRegistrationData userOfApp)
            throws IllegalBlockSizeException, BadPaddingException {

        bot.sendInfo("Шифрование пароля");
        String userPass = userOfApp.getPassword();
        userOfApp.setPassword(new String(cipher.doFinal(userPass.getBytes())));

        var dataOfUser = new User();
        dataOfUser.setCountOfCompletedTrainers(0);
        if (userOfApp.getUser() == null) userOfApp.setUser(dataOfUser);

        userOfApp = userRepository.save(userOfApp);
        userOfApp.setId(userOfApp.getUser().getId());
        userOfApp.setPassword(userPass);

        return userOfApp;
    }

    public UserRegistrationDataRequest checkUser(UserRegistrationData usersOfApp) {
        bot.sendInfo("Поиск пользователя с email " + usersOfApp.getEmail() + "\n");
        Optional<UserRegistrationData> userOptional =
                userRepository.findUserRegistrationDataByEmail(usersOfApp.getEmail());

        if (userOptional.isEmpty()) {
            bot.sendWarning("Пользователь с  email  " + usersOfApp.getEmail() + " не найден");

            return new UserRegistrationDataRequest(1, "user with email " +
                    usersOfApp.getEmail() + " doesn't exist", usersOfApp);
        }
        UserRegistrationData usersOfAppOnBD = userOptional.get();

        String userPass = usersOfApp.getPassword();
        try {
            String HashPass = new String(cipher.doFinal(userPass.getBytes()));
            if (!usersOfAppOnBD.getPassword().equals(HashPass)) {
                bot.sendWarning("Пользователь с  email  " + usersOfApp.getEmail()
                        + " ввел не верный пароль: " + userPass);
                return new UserRegistrationDataRequest(2, "wrong password", usersOfApp);
            }
        } catch (IllegalBlockSizeException | BadPaddingException e) {
            bot.sendError("Непредвиденная ошибка   " + e.getMessage());
            throw new RuntimeException(e);
        }

        usersOfAppOnBD.setPassword(userPass);
        bot.sendWarning("Пользователь с  email  " + usersOfApp.getEmail()
                + " успешно авторизовался " + userPass);
        return new UserRegistrationDataRequest(0, "authentication was successful", usersOfAppOnBD);
    }


}
