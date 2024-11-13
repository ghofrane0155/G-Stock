package tn.esprit.stock.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import tn.esprit.stock.entities.User;
import tn.esprit.stock.repository.IUserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class GestionUserImpl implements IGestionUser{
    @Autowired
    IUserRepository ur;
    @Override
    public List<User> findAll() {
        return ur.findAll();
    }

    @Override
    public User findById(Integer id) {
        return ur.findById(id).get();
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return ur.findByEmail(email);
    }

    @Override
    public List<User> findByNomOrPrenom(String name, String pre) {
        return ur.findByFirstnameContainingIgnoreCaseOrLastnameContainingIgnoreCase(name,pre);
    }

    @Override
    public User update(User user) {
        // Check if the user exists
        Optional<User> optionalUser = ur.findById(user.getId());
        if (optionalUser.isPresent()) {
            // Get the existing user
            User existingUser = optionalUser.get();

            // Update the existing user with the new details
            existingUser.setFirstname(user.getFirstname());
            existingUser.setLastname(user.getLastname());
            existingUser.setDateOfBirth(user.getDateOfBirth());

            // Save the updated user
            return ur.save(existingUser);
        } else {
            throw new IllegalArgumentException("User with ID " + user.getId() + " not found");
        }
    }

    @Override
    public void delete(Integer id) {
        ur.deleteById(id);
    }

    @Override
    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName(); // Assuming the email is used as the username
        return ur.findByEmail(email).orElse(null);
    }
}
