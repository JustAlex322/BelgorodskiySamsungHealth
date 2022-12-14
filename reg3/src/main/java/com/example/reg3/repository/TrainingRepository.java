package com.example.reg3.repository;

import com.example.reg3.dao.DayOfTraining;
import com.example.reg3.dao.Training;
import com.example.reg3.requastion.ProgressOfUser;
import com.example.reg3.requastion.StatisticOfTrain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrainingRepository
        extends JpaRepository<Training, Long> {

    @Query("SELECT train.id as id, " +
            " train.label as label, " +
            " train.countOfDays as countOfDays," +
            " train.description as description, " +
            " prog.dayOfTraining as dayOfTraining " +
            "FROM User u " +
            "JOIN u.userProgresInTraining prog " +
            "JOIN prog.trainingId train " +
            "WHERE u.id = ?1")
    List<ProgressOfUser> findProgressOfUser(Long id);

    List<Training> findByStatus(String status);

    @Query("SELECT t.daysOfTrainings " +
            "FROM Training t " +
            "WHERE t.id = ?1")
    List<DayOfTraining> findDaysOfTraining(Long idOfTrain);


    @Query("SELECT d " +
            "FROM Training t " +
            "JOIN t.daysOfTrainings d " +
            "WHERE d.numberOfDay = ?2 AND t.id = ?1")
    DayOfTraining findDayOfTrain(Long idOfTrain, Integer numOfDay);


    List<Training> findByLabel(String label);

    @Query("SELECT t.label as label, COUNT(up) as countOfUsers " +
            "FROM UserProgressInTraining up " +
            "JOIN up.trainingId t " +
            "WHERE up.dayOfTraining  * 1.0 / t.countOfDays * 100 >= ?1 " +
            "GROUP BY t.label " +
            "ORDER BY COUNT(up)")

    List<StatisticOfTrain> findTopOfTranings(Double percentOfProgress);
}
