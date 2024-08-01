package tn.esprit.stock.auth;

import jakarta.validation.constraints.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Builder
public class RegistrationRequest {
    @NotEmpty(message = "Firstname is mandatory")
    @NotNull(message = "Firstname is mandatory")
    private String firstname;
    @NotEmpty(message = "Lastname is mandatory")
    @NotNull(message = "Lastname is mandatory")
    private String lastname;
    @Email(message = "Email is not well formatted")
    @NotEmpty(message = "Email is mandatory")
    @NotNull(message = "Email is mandatory")
    private String email;
    @NotEmpty(message = "Password is mandatory")
    @NotNull(message = "Password is mandatory")
    @Size(min = 8, message = "Password should be 8 characters long minimum")
    private String password;

    @NotEmpty(message = "Phone number is mandatory")
    @NotNull(message = "Phone number is mandatory")
    @Pattern(regexp = "^\\d{8}$", message = "Phone number must be 8 digits long and contain only numbers")
    private String phone;
    @NotNull(message = "Date of birth is mandatory")
    private LocalDate dateOfBirth;
}
