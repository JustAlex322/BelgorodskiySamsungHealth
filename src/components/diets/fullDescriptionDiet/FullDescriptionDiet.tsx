
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import Select from './../../../common/select/Select';
import { useAppDispatch } from './../../../app/hooks';
import { setLoading } from '../../../slices/common/commonSlice';
import withLoading from './../../HOC/withLoading';
import { getMealsTimes, getTypes } from './../../../slices/dish/thunk';
import { Button } from 'react-bootstrap';
import { getMealsByFilter } from './../../../slices/diets/thunk';
import { Ifilters } from '../../../API/dietsAPI/TdietsAPI';
import RecomendedDish from './recomendedDIsh/RecomendenDish';

interface IFullDescriptionDietProps {
}

const FullDescriptionDiet: React.FunctionComponent<IFullDescriptionDietProps> = (props) => {

    const [typeOfMeal, settypeOfMeal] = useState("")
    const [mealTime, setmealTime] = useState("");
    const [isVisible, setisVisible] = useState(false)

    let mealTimesArr = useAppSelector(state => state.dish.mealTimesArr)
    let mealTypesArr = useAppSelector(state => state.dish.mealTypesArr)
    let currentDiet = useAppSelector(state => state.diets.currentDietId)
    let recomendedDishArr = useAppSelector(state => state.diets.recomendedDishArr)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setLoading(true))
        dispatch(getMealsTimes())
        dispatch(setLoading(true))
        dispatch(getTypes())
    })

    const getMealsByFilterHanlder = () => {
        const filters : Ifilters = {
            dietId : currentDiet?.id,
            typeOfMeal : typeOfMeal,
            mealTime : mealTime
        }

        dispatch(getMealsByFilter(filters))
        setisVisible(true)
    }

    return (
        <div className='w-100' style={{margin : "10 auto"}}>
            <div>
                <p>Вы выбрали тренировку {currentDiet?.label}</p>
                <p>Для просмотра блюд выберите тип блюд и время приема пищи</p>
            </div>
            <div className="selectWrapper">
                <Select valueArr={mealTimesArr} onChangeHanler={setmealTime}/>
                <Select valueArr={mealTypesArr} onChangeHanler={settypeOfMeal}/>
            </div>
            <Button onClick={getMealsByFilterHanlder}>Просмотреть еду из данной диеты</Button>
            {isVisible ? <RecomendedDish recomendedDishArr={recomendedDishArr}/> : <></>}
        </div>
    )
};

export default withLoading(FullDescriptionDiet);
