package ssafy.uniqon.model;

import jakarta.persistence.*;
import lombok.*;

import java.security.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Animals{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "animal_id")
    private Integer id;

   @Column(name = "species")
   private String species;

   @Column(name = "creature_name")
   private String creature_name;

   @Column(name = "feature")
   private String feature;

   @Column(name = "image")
   private String image;

   @Column(name = "hatch_date")
   private Timestamp hatch_date;

   @Column(name = "weight")
   private Integer weight;

   @Column(name = "gender")
   private String gender;

   @Column(name = "size")
   private Integer size;

    @OneToMany(mappedBy = "animal")
   private List<Posts> postsList = new ArrayList<>();

    @OneToMany(mappedBy = "animal")
    private List<Collections> collectionsList = new ArrayList<>();
}