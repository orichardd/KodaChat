package Koda.chat.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.util.Date;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;

@Service
public class JWTService {



    private SecretKey getSignKey() {
        return Keys.hmacShaKeyFor(
                "abcdefghijklmnopqrstuvwxyz123456".getBytes(StandardCharsets.UTF_8)
        );
    }

    public String GenerateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000))
                .signWith(getSignKey())
                .compact();
    }

    public String extractUsername(String token){
        return ExtractAllClaims(token).getSubject();
    }

    public boolean ValidateToken(String token, String username){
        final String extractedUsername = extractUsername(token);

        return(extractedUsername.equals(username) && !isTokenExpired(token));
    }

    private Claims ExtractAllClaims(String token){
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public Date extractExpiration(String token) {
        return ExtractAllClaims(token).getExpiration();
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
}
