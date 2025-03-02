import './App.css';
import { useState, useEffect } from 'react';

const QuoteFetcher = () => {
	const [quote, setQuote] = useState('');
	const [author, setAuthor] = useState('');
	const [category, setCategory] = useState('');
	const [loading, setLoading] = useState(false);

	async function fetchData() {
		try {
			const response = await fetch('https://api.api-ninjas.com/v1/quotes', {
				headers: {
					'X-Api-Key': import.meta.env.VITE_API_KEY,
				},
			});
			const data = await response.json();
			console.log('Fetched data:', data);

			if (data.length > 0) {
				setQuote(data[0].quote);
				setAuthor(data[0].author);
				setCategory(data[0].category);
			} else {
				console.log('No quote data received.');
			}
		} catch (error) {
			console.log('Fetch error:', error);
		}
		setLoading(false);
	}

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div>
			<h1>QUOTE RANDOM</h1>
			<p>{quote}</p>
			<p>{author}</p>
			<p>{category}</p>
			<button onClick={fetchData}>{loading ? 'loading quote...' : 'New Quote'}</button>
		</div>
	);
};

export default QuoteFetcher;
