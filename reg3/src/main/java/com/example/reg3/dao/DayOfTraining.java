package com.example.reg3.dao;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "days_of_training")
public class DayOfTraining {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "days_of_training_id", nullable = false)
    private Long id;

    @Column(name = "number_of_day", nullable = false)
    private Integer numberOfDay;


    @ManyToMany()
    @JoinTable(
            name = "set_day_map",
            joinColumns = @JoinColumn(
                    name = "days_of_training_id",
                    referencedColumnName = "days_of_training_id"
            ),
            inverseJoinColumns = @JoinColumn(
                    name = "set_id",
                    referencedColumnName = "set_id"
            )
    )
    private List<Set> sets;


    public DayOfTraining(Integer numberOfDay,
                         List<Set> sets) {
        this.numberOfDay = numberOfDay;
        this.sets = sets;
    }
}
