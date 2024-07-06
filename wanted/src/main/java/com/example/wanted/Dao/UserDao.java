package com.example.wanted.Dao;

import com.example.wanted.Vo.QnaInfores;
import com.example.wanted.Vo.UserInfores;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserDao extends JpaRepository<UserInfores,Long> {
   UserInfores findByUserId(String userId);
}
