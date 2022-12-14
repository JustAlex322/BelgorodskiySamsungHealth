package com.example.reg3.dao;


import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user_progress_in_training")
public class UserProgressInTraining {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_progress_in_training_id", nullable = false)
    private Long id;

    @Column(name = "day_of_training")
    private Integer dayOfTraining;


    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "training_id",
            referencedColumnName = "training_id")
    private Training trainingId;

    public UserProgressInTraining(Integer dayOfTraining,
                                  Training trainingId) {
        this.dayOfTraining = dayOfTraining;
        this.trainingId = trainingId;
    }

    public boolean isComplite() {
        return getDayOfTraining() >= getTrainingId().getCountOfDays();
    }

    public void incCountOfDays() throws Exception {
        if (trainingId.getCountOfDays() >= dayOfTraining ){
            dayOfTraining++;
        }else {
            throw new Exception("колличество выполненых дней превышает общее колличество дней");
        }

    }
}
