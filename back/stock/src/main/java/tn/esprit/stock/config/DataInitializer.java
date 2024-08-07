package tn.esprit.stock.config;

import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import tn.esprit.stock.entities.Role;
import tn.esprit.stock.entities.User;
import tn.esprit.stock.repository.IRoleRepository;
import tn.esprit.stock.repository.IUserRepository;

import java.time.LocalDate;
import java.util.Collections;

@Configuration
public class DataInitializer {

    private final IRoleRepository roleRepository;
    private final IUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(IRoleRepository roleRepository, IUserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostConstruct
    public void init() {
        // Initialize roles
        if (roleRepository.findByName("USER").isEmpty()) {
            roleRepository.save(Role.builder().name("USER").build());
        }
        if (roleRepository.findByName("ADMIN").isEmpty()) {
            roleRepository.save(Role.builder().name("ADMIN").build());
        }

        // Initialize admin user
        if (userRepository.findByEmail("admin@example.com").isEmpty()) {
            Role adminRole = roleRepository.findByName("ADMIN").orElseThrow(() -> new RuntimeException("ADMIN role not found"));
            Role userRole = roleRepository.findByName("USER").orElseThrow(() -> new RuntimeException("USER role not found"));

            User admin = User.builder()
                    .firstname("Admin")
                    .lastname("Admin")
                    .email("admin@example.com")
                    .password(passwordEncoder.encode("adminpassword")) // Encode the password
                    .enabled(true)
                    .accountLocked(false)
                    .phone("123-456-7890") // Set phone number
                    .dateOfBirth(LocalDate.of(1990, 1, 1)) // Set date of birth
                    .roles(Collections.singletonList(adminRole)) // Assign ADMIN role
                    .build();

            userRepository.save(admin);
        }
    }
}
