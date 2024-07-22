package tn.esprit.stock.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tn.esprit.stock.repository.IUserRepository;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final IUserRepository repository;
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String userEmail) throws UsernameNotFoundException {
            return repository.findByEmail(userEmail)
                    .orElseThrow(()->new UsernameNotFoundException("User not found"));
    }
}
