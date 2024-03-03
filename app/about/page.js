'use client'
import { Button } from "@nextui-org/react"
import Image from "next/image"
import Link from "next/link"
import Slider from "react-slick"

const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    fade: true,
    autoplay: true,
    centerMode: true
}

export default function page() {
    return (
        <div style={{ width: 400 }}>
            <Slider {...settings}>
                <div className="p-1 flex flex-col items-center justify-center">
                    <h3>Formulario</h3>
                    <p>Puedes crear nuevas tareas dirigiendote al formulario al hacer click en el botón
                    </p>
                    <Link href={'/todo'} legacyBehavior passHref>
                        <Button variant="light" color="primary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Nueva tarea
                        </Button>
                    </Link>
                    <Image src='/form.png' width={200} height={300}></Image>
                </div>
                <div className="p-1">
                    <h3>Filtros</h3>
                    <p>
                        Puedes filtrar las tareas por su estado, si están hechas o no, y por su importancia, si son favoritas o no.
                    </p>
                    <Image src='/filter_fav.png' width={300} height={400}></Image>
                    <Image src='/filter_done.png' width={300} height={400}></Image>
                </div>
                <div className="p-1">
                    <h3>Menú flotante</h3>
                    <p>
                        Puedeas acceder a todas las tareas en cualquier apartado de la aplicación haciendo click en el menú flotante ubicado en la esquina superior derecha, con este menu puedes filtrar las tareas por su estado y su importancia ademas de poder marcarlas como favoritas o completadas.
                    </p>
                    <Image src='/menu.png' width={300} height={400}></Image>
                </div>
            </Slider>
        </div>
    )
}
