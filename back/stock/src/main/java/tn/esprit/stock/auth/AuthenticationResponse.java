package tn.esprit.stock.auth;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import tn.esprit.stock.entities.User;

@Getter
@Setter
@Builder
public class AuthenticationResponse {
    private String token;
    private User user;

}
