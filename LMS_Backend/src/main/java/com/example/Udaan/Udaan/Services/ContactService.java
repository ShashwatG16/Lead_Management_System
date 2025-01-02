package com.example.Udaan.Udaan.Services;

import com.example.Udaan.Udaan.Enitty.Contact;

import java.util.List;

public interface ContactService {

    Contact addContact(Long restaurantId, Contact contact);

    Contact updateContact(Long contactId, Contact contact);

    void deleteContact(Long contactId);

    List<Contact> getContactsByRestaurantId(Long restaurantId);
}
