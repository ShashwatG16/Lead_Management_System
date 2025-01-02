package com.example.Udaan.Udaan.ServiceImpl;

import com.example.Udaan.Udaan.Enitty.Contact;
import com.example.Udaan.Udaan.Enitty.Restaurants;
import com.example.Udaan.Udaan.Repositories.ContactRepository;
import com.example.Udaan.Udaan.Repositories.RestaurantRepository;
import com.example.Udaan.Udaan.Services.ContactService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactServiceImpl implements ContactService {

    private final ContactRepository contactRepository;
    private final RestaurantRepository restaurantRepository;

    public ContactServiceImpl(ContactRepository contactRepository, RestaurantRepository restaurantRepository) {
        this.contactRepository = contactRepository;
        this.restaurantRepository = restaurantRepository;
    }

    @Override
    public Contact addContact(Long restaurantId, Contact contact) {
        Restaurants restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new RuntimeException("Restaurant not found with ID: " + restaurantId));
        contact.setRestaurant(restaurant);
        return contactRepository.save(contact);
    }

    @Override
    public Contact updateContact(Long contactId, Contact contact) {
        Contact existingContact = contactRepository.findById(contactId)
                .orElseThrow(() -> new RuntimeException("Contact not found with ID: " + contactId));
        existingContact.setName(contact.getName());
        existingContact.setRole(contact.getRole());
        existingContact.setContactInfo(contact.getContactInfo());
        return contactRepository.save(existingContact);
    }

    @Override
    public void deleteContact(Long contactId) {
        contactRepository.deleteById(contactId);
    }

    @Override
    public List<Contact> getContactsByRestaurantId(Long restaurantId) {
        return contactRepository.findByRestaurantId(restaurantId);
    }
}
