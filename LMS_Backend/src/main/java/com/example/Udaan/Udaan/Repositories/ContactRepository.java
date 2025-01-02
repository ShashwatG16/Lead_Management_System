package com.example.Udaan.Udaan.Repositories;

import com.example.Udaan.Udaan.Enitty.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContactRepository extends JpaRepository<Contact, Long> {
    List<Contact> findByRestaurantId(Long restaurantId);
}
