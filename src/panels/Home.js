import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ListItem, Button, Group, Div, PanelHeader, Header, Link, HorizontalScroll, Avatar, Gallery } from '@vkontakte/vkui';
import banner1 from '../img/banner-1.png';


const itemStyle = {
	flexShrink: 0,
	width: 130,
	height: 'auto',
	flexDirection:
	'column',
	alignItems: 'center',
	fontSize: 16
};

const imgStyle = {
	width: 110,
	height: 150,
	borderRadius: 20
};

const nameStyle = {
	width: 100,
	marginTop: 0,
	marginBottom: 0,
	padding: 3
};

const genre = {
	color: "grey",
	fontSize: 14,
};

const Home = ({ id, openFilm, activePreview, go, futurePreview, setid }) => (


	<Panel id={id}>
		<PanelHeader>Главная</PanelHeader>
    <Gallery
      slideWidth="100%"
      style={{ height: 150, borderRadius: 10, marginLeft: 15, marginRight: 15, marginTop: 15, marginBottom: 15 }}
      bullets="dark"
			autoplay={3000}
    >
		<Link onClick={go} data-to="popular"><img style={{height: 150, width:'100%'}} src={banner1}/></Link>
    </Gallery>
		<Group style={{ paddingBottom: 8 }}>
				<Header level="2" aside={<Link>Показать все</Link>}>
						Сейчас в кино
				</Header>
        <HorizontalScroll>
          <div style={{ display: 'flex' }}>
						{	activePreview &&
							activePreview.map(function(item, i){
								return <Link onClick={openFilm} data-fid={item._id} data-to="film" key={i} style={{ ...itemStyle, paddingLeft: 12 }}>
		              <img src={item.image} size={64} style={{...imgStyle, marginBottom: 8 }}></img>
									<p style={{...nameStyle, ...genre}}>{item.genre}</p>
		              <p style={nameStyle}>{item.title}</p>
		            </Link>
							})
						}
          </div>
        </HorizontalScroll>
      </Group>

			<Group style={{ paddingBottom: 8 }}>
					<Header level="2" aside={<Link>Показать все</Link>}>
							Скоро в кино
					</Header>
					<HorizontalScroll>
						<div style={{ display: 'flex' }}>
						{	futurePreview &&
							futurePreview.map(function(item, i){
								return <Link onClick={openFilm} data-fid={item._id} data-to="film" key={i} style={{ ...itemStyle, paddingLeft: 12 }}>
									<img src={item.image} size={64} style={{...imgStyle, marginBottom: 8 }}></img>
									<p style={{...nameStyle, ...genre}}>{item.genre}</p>
									<p style={nameStyle}>{item.title}</p>
								</Link>
							})
						}
						</div>
					</HorizontalScroll>
				</Group>

	</Panel>
);

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Home;
