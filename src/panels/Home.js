import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ListItem, Button, Group, Div, PanelHeader, Header, Link, HorizontalScroll, Avatar, Gallery } from '@vkontakte/vkui';
import RatingSpan from '../components/RatingSpan';


const itemStyle = {
	flexShrink: 0,
	width: 130,
	height: 'auto',
	flexDirection: 'column',
	alignItems: 'center',
	fontSize: 16,
	paddingLeft: 4
};

const collectionStyle = {
	flexShrink: 0,
	width: "80%",
	margin: "auto",
	textAlign: "center",
	flexDirection: 'column',
	alignItems: 'center',
	fontSize: 16,
	paddingLeft: 4,
	background: '#f4f4f4',
	borderRadius: 6
};

const imgStyle = {
	width: 110,
	height: 150,
	borderRadius: 15
};

const nameStyle = {
	width: 100,
	marginTop: 0,
	marginBottom: 0,
	padding: 3,
	overflow: 'hidden',
	display: '-webkit-box',
	WebkitLineClamp: 2,
	WebkitBoxOrient: 'vertical'
};

const genre = {
	color: "grey",
	fontSize: 14,
};

const Home = ({collections, id, openFilm, activePreview, go, futurePreview, setid }) => (


	<Panel id={id}>
		<PanelHeader>Главная</PanelHeader>
    <Gallery
      slideWidth="100%"
      style={{ height: 150, marginLeft: 15, marginRight: 15, marginTop: 15, marginBottom: 15 }}
      bullets="dark"
			autoplay={5000}
    >
		<Link onClick={go} data-to="popular" style={{display: 'relative', borderRadius: 15}}>
			<div style={{height: 'auto', width: '100%', height: '100%', background: 'linear-gradient(to right, #606c88, #3f4c6b)', borderRadius: 15}}>
				<span style={{width: "80%", marginTop: 5, paddingLeft: 15}}>
					<h2 style={{paddingLeft: 15, color: 'white'}}>Популярное среди друзей</h2>
				</span>
			</div>
		</Link>
		<Link href="https://vk.com/findfilmapp" style={{display: 'relative', borderRadius: 15}}>
			<div style={{height: 'auto', width: '100%', height: '100%', background: 'linear-gradient(to right, #606c88, #3f4c6b)', borderRadius: 15}}>
				<span style={{marginTop: 5, paddingLeft: 15}}>
					<h2 style={{paddingLeft: 15, color: 'white'}}>Наше сообщество (конкурс!)</h2>
				</span>
			</div>
		</Link>
    </Gallery>
		<Group style={{ paddingBottom: 8 }}>
				<Header level="2" aside={<Link data-to='active' onClick={go}>Показать все</Link>}>
						Сейчас в кино
				</Header>
        <HorizontalScroll>
          <div style={{ display: 'flex' }}>
						{	activePreview &&
							activePreview.map(function(item, i){
								return <Link onClick={openFilm} data-fid={item.tmdbId} data-to="film" key={i} style={{ ...itemStyle }}>
									<div style={{position: 'relative'}}>
										{item.tmdbFullData.vote_average && <RatingSpan rating={item.tmdbFullData.vote_average}/>}
			              <img src={item.image} size={64} style={{...imgStyle, marginBottom: 8 }}></img>
									</div>
									{/*<p style={{...nameStyle, ...genre}}>{item.genre}</p>*/}
									<p style={nameStyle}>{item.title}</p>
		            </Link>
							})
						}
          </div>
        </HorizontalScroll>
      </Group>
			<Group style={{ paddingBottom: 8 }}>
					<Header level="2" aside={<Link data-to='future' onClick={go}>Показать все</Link>}>
							Скоро в кино
					</Header>
					<HorizontalScroll>
						<div style={{ display: 'flex' }}>
						{	futurePreview &&
							futurePreview.map(function(item, i){
								return <Link onClick={openFilm} data-fid={item.tmdbId} data-to="film" key={i} style={{ ...itemStyle }}>
									<div style={{display: 'relative'}}>
										<img src={item.image} size={64} style={{...imgStyle, marginBottom: 8 }}></img>
									</div>
									{/*<p style={{...nameStyle, ...genre}}>{item.genre}</p>*/}
									<p style={nameStyle}>{item.title}</p>
								</Link>
							})
						}
						</div>
					</HorizontalScroll>
				</Group>
				<Group style={{ paddingBottom: 8 }}>
						<Header level="2" aside={<Link data-to='collections' onClick={go}>Показать все</Link>}>
								Коллекции
						</Header>
							<div style={{ display: 'flex' }}>
							{	collections &&
								collections.map(function(item, i){
									return <div onClick={go} data-data={item._id} data-to="collection" key={i} style={{ ...collectionStyle }}>
										{/*<p style={{...nameStyle, ...genre}}>{item.genre}</p>*/}
										<img style={{borderRadius: 3, marginTop: 20, width: 200, marginBottom: 8 }} src={item.image}/>
										<p style={{fontWeight: 'bold', color: "#5a5a5a"}}>{item.title}</p>
									</div>
								})
							}
							</div>
					</Group>

	</Panel>
);

export default Home;
