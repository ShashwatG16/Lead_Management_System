package com.example.Udaan.Udaan.Controller;

import com.example.Udaan.Udaan.Enitty.Contact;
import com.example.Udaan.Udaan.Services.ContactService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants/{restaurantId}/contacts")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    public ResponseEntity<Contact> addContact(@PathVariable Long restaurantId, @RequestBody Contact contact) {
        return ResponseEntity.ok(contactService.addContact(restaurantId, contact));
    }

    @PutMapping("/{contactId}")
    public ResponseEntity<Contact> updateContact(@PathVariable Long contactId, @RequestBody Contact contact) {
        return ResponseEntity.ok(contactService.updateContact(contactId, contact));
    }

    @DeleteMapping("/{contactId}")
    public ResponseEntity<Void> deleteContact(@PathVariable Long contactId) {
        contactService.deleteContact(contactId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Contact>> getContactsByRestaurantId(@PathVariable Long restaurantId) {
        return ResponseEntity.ok(contactService.getContactsByRestaurantId(restaurantId));
    }
}
