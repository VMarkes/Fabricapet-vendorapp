import React from "react";
import { Sliderify } from "react-sliderify";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function MonthPromotion() {

    const banners = [
        {url: "https://arquivos.mercos.com/media/b2b/317541/e98c0ac0-b77c-11ed-94d1-b6029869d4d1.jpg"},
        {url: "https://arquivos.mercos.com/media/b2b/317541/e47b9552-b77f-11ed-99e3-12b562b869c0.jpg"},
        {url: "https://arquivos.mercos.com/media/b2b/317541/eee82fbe-b77f-11ed-ac98-5a9782da5bd9.jpg"},
    ];

    return (
        <div className="container">
            <Sliderify showSpot={false} activeColor="#1e9ac7" navPrevIcon={<ArrowBackIosNewIcon sx={{ color: "#1e9ac7"}} />} navNextIcon={<ArrowForwardIosIcon sx={{ color: "#1e9ac7"}} />}>
                {banners.map((images) => 
                    <img width={"100%"} key={images} src={images.url} />
                )}
            </Sliderify>
        </div>

    );
}

export default MonthPromotion;