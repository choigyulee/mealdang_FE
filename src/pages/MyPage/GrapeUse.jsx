import styled from "styled-components";
import { LuGrape } from "react-icons/lu";
import getGrapeUse from "../../APIs/get/getGrapeUse";
import { useEffect, useState } from "react";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Introduce = styled.div`
    width: 300px;
    height: 23px;
    color: #000;
    font-family: "Wavve PADO TTF";
    font-size: 21px;
    font-weight: 400;
    align-self: flex-start;
    margin-left: 27px;
    margin-bottom: 18px;
`

// 포도 사용 현황 
const GrapeContainer = styled.div`
    width: 336px;
    height: 160px;
    border-radius: 10px;
    background:  #E6E6FA;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    gap: 22px;
    margin-bottom: 22px;
`

const FillGrapeIcon = styled(LuGrape)`
    width: 30px;
    height: 30px;
    color: #6A0DAD;
    fill: #6A0DAD;
    padding-left: 7px;
    padding-right: 12px;

`
const GrapeIcon = styled(LuGrape)`
    width: 30px;
    height: 30px;
    color: #6A0DAD;
    padding-left: 7px;
    padding-right: 12px;
`

const GrapeText = styled.div`
    width: 109px;
    color: #6A0DAD;
    font-family: "Wavve PADO TTF";
    font-size: 21.875px;
    font-weight: 400;
`

// 누적 포도 
const Accumulate = styled.div`
    display: flex;
    align-items: center;
    padding-top: 14px;

`
// 사용한 포도 
const Use = styled.div`
    display: flex;
    align-items: center;
`

// 현재 포도 
const Present = styled.div`
    display: flex;
    align-items: center;
    padding-bottom: 17px;
`

// 포도 갯수 
const Amount = styled.div`
    width: 109px;
    color: #6A0DAD;
    text-align: right;
    font-family: "Wavve PADO TTF";
    font-size: 22px;
    font-weight: 400;
    padding-left: 39px;
`
const History = styled.div`
    width: 335px;
    height: auto;
    display: flex;
    flex-direction: column;
`

const BreakDown = styled.div`
    width: 335px;
    height: auto;
    border-top: 1px solid #6A0DAD;
    border-bottom: 1px solid #6A0DAD;
    padding-bottom: 10px;
`

const UseDate = styled.div`
    color: #000;
    font-family: "Wavve PADO TTF";
    font-size: 26.25px;
    font-weight: 400;
    padding-top: 10px;
`
const UsedTitle = styled.div`
    width: 250px;
    color: #000;
    font-family: "Wavve PADO TTF";
    font-size: 21.875px;
    font-weight: 400;
    padding-top: 10px;
    display: block;
`

const TotalGrape = styled.div`
    width: 100%;
    height: 42px; 
    display: flex;
    flex-direction: column;
    text-align: right; 
    font-family: Inter;
    font-size: 17.5px;
    justify-content: flex-end;
    position: sticky;
    bottom: 10;
`
const UsedGrape = styled.div`
    color: #000;;
    font-weight: 400;
`

const PresentGrape = styled.div`
    color: rgba(0, 0, 0, 0.55);
`

export default function GraepUse(){

    const [Podo,setPodo] = useState(
        {
        "cumulative_podo": culmulative_podo,
	    "used_podo": used_podo,
	    "remained_podo": remained_podo,	
	    "purchased_list":[
		{
			"date": date,
			"items": items,
			"item_price": item_price,
			"remaining_points": remaining_points	
		},
	    ],
	    "received_list":[
        {       
			"date": date,
			"items": items,
			"received_points": received_points,
			"remaining_points": remaining_points	
		},
	    ]
        }
    )
    
    const combinedList = [
        ...Podo.purchased_list.map(item => ({
            date: item.date,
            title: item.items,
            amount: -item.item_price, 
            remaining: item.remaining_points
        })),
        ...Podo.received_list.map(item => ({
            date: item.date,
            title: item.items,
            amount: item.received_points, 
            remaining: item.remaining_points
        }))
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getGrapeUse();
                setPodo(response);
                console.log(Podo)
            } catch (error) {
                console.error('message:', error.message);
                alert('포도 사용 내역 데이터를 찾지 못했습니다.')
            } 
        };

        fetchData();
    }, []);

    return(
        <Container>
            <Introduce>포도 교환 내역을 확인할 수 있어요 </Introduce>
            <GrapeContainer>
                <Accumulate>
                    <FillGrapeIcon/>
                    <GrapeText>누적 포도</GrapeText>
                    <Amount>{Podo.cumulative_podo}개</Amount>
                </Accumulate>
                <Use>
                    <GrapeIcon/>
                    <GrapeText>사용한 포도</GrapeText>
                    <Amount>{Podo.used_podo}개</Amount>
                </Use>
                <Present>
                    <FillGrapeIcon/>
                    <GrapeText>현재 포도</GrapeText>
                    <Amount>{Podo.remained_podo}개</Amount>
                </Present>
            </GrapeContainer>
            <History>
            {combinedList.map((item, index) => (
                    <BreakDown key={index}>
                        <UseDate>{item.date}</UseDate>
                        <UsedTitle>{item.title}</UsedTitle>
                        <TotalGrape>
                            <UsedGrape>{item.amount} 포도</UsedGrape>
                            <PresentGrape>{item.remaining}포도</PresentGrape>
                        </TotalGrape>
                    </BreakDown>
                ))}
            </History>
        </Container>
    )

}