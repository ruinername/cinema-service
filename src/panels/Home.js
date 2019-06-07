import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ListItem, Button, Group, Div, PanelHeader, Header, Link, HorizontalScroll, Avatar, Gallery, List, Cell } from '@vkontakte/vkui';
import RatingSpan from '../components/RatingSpan';
import DatePreview from '../components/DatePreview';
import StyledButton from '../components/StyledButton';
import Icon24BrowserForward from '@vkontakte/icons/dist/24/browser_forward';

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
	borderRadius: 6,
	paddingBottom: 5
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
	paddingBottom: 0,
	overflow: 'hidden',
	display: '-webkit-box',
	WebkitLineClamp: 2,
	WebkitBoxOrient: 'vertical'
};

const genre = {
	color: "grey",
	fontSize: 14,
};

const Home = ({collections, id, openFilm, activePreview, go, futurePreview, setid, futurePopular, activePopular }) => (


	<Panel id={id}>
		<PanelHeader>Главная</PanelHeader>

		<Group style={{ paddingBottom: 8 }}>
				<Header level="1">
						Полезные ссылки
				</Header>
				<List>
          <Cell onClick={go} data-to="popular" asideContent={<Icon24BrowserForward />} multiline description="В данном разделе мы собрали самые популярные фильмы среди твоих друзей!">Популярное среди друзей</Cell>
					<Cell href="https://vk.com/findfilmgroup" asideContent={<Icon24BrowserForward />} multiline description="Узнавай о новинках кино и интересных фактах у нас в группе!">Наш паблик</Cell>
					
        </List>
    </Group>

		<Group style={{ paddingBottom: 8 }}>
				<Header level="1" aside={<Link data-to='active' onClick={go}>Показать все</Link>}>
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
			{/*<Group style={{ paddingBottom: 8 }}>
					<Header level="1" aside={<Link data-to='active' onClick={go}>Показать все</Link>}>
							В центре внимания
					</Header>
					<HorizontalScroll>
						<div style={{ display: 'flex' }}>
							{	activePopular &&
								activePopular.map(function(item, i){
									return <Link onClick={openFilm} data-fid={item.tmdbId} data-to="film" key={i} style={{ ...itemStyle }}>
										<div style={{position: 'relative'}}>
											{item.tmdbFullData.vote_average && <RatingSpan rating={item.tmdbFullData.vote_average}/>}
											<img src={item.image} size={64} style={{...imgStyle, marginBottom: 8 }}></img>
										</div>
										<p style={nameStyle}>{item.title}</p>
									</Link>
								})
							}
						</div>
					</HorizontalScroll>
				</Group>*/}
			<Group style={{ paddingBottom: 8 }}>
					<Header level="1" aside={<Link data-to='future' onClick={go}>Показать все</Link>}>
							Скоро в кино
					</Header>
					<HorizontalScroll>
						<div style={{ display: 'flex' }}>
						{	futurePreview &&
							futurePreview.map(function(item, i){
								return <Link onClick={openFilm} data-fid={item.tmdbId} data-to="film" key={i} style={{ ...itemStyle }}>
									<div style={{position: 'relative'}}>
										<img src={item.image} size={64} style={{...imgStyle, marginBottom: 8, boxShadow: "inset 0px 0px 10px rgba(0,0,0,0.9)" }}></img>
									</div>
									{/*<p style={{...nameStyle, ...genre}}>{item.genre}</p>*/}
									{item.date && <DatePreview date={item.date}/>}
									<p style={nameStyle}>{item.title}</p>
								</Link>
							})
						}
						</div>
					</HorizontalScroll>
				</Group>
					<Group style={{ paddingBottom: 8 }}>
							<Header level="1" aside={<Link data-to='futurepopular' onClick={go}>Показать все</Link>}>
								Ожидаемые
							</Header>
							<HorizontalScroll>
								<div style={{ display: 'flex' }}>
								{	futurePopular &&
									futurePopular.map(function(item, i){
										return <Link onClick={openFilm} data-fid={item.tmdbId} data-to="film" key={i} style={{ ...itemStyle }}>
											<div style={{position: 'relative'}}>
												<img src={item.image} size={64} style={{...imgStyle, marginBottom: 8}}></img>
											</div>
											{/*<p style={{...nameStyle, ...genre}}>{item.genre}</p>*/}
											{item.date && <DatePreview date={item.date}/>}
											<p style={nameStyle}>{item.title}</p>
										</Link>
									})
								}
								</div>
							</HorizontalScroll>
						</Group>
				<Group style={{ paddingBottom: 8 }}>
						<Header level="1" aside={<Link data-to='collections' onClick={go}>Показать все</Link>}>
								Коллекции
						</Header>
							<div style={{ display: 'flex', flexDirection: 'column', }}>
							{	collections &&
								collections.map(function(item, i){
									return <div>
										<div onClick={go} data-data={item._id} data-to="collection" key={i} style={{ ...collectionStyle }}>
											{/*<p style={{...nameStyle, ...genre}}>{item.genre}</p>*/}
											<img style={{borderRadius: 3, marginTop: 20, width: 200, marginBottom: 8 }} src={item.image}/>
											<p style={{fontWeight: 'bold', color: "#5a5a5a"}}>{item.title}</p>
										</div><br/>
									</div>
								})
							}
							</div>
					</Group>

	</Panel>
);

export default Home;
