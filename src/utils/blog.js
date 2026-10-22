const POSTS_KEY = 'posts'
import denVauImage from '../assets/den-vau.jpg'
import myTamImage from '../assets/my-tam.jpg'
import sonTungImage from '../assets/son-tung.jpg'

const SAMPLE_POSTS = [
    {
        id: 9001,
        title: 'Đen Vâu và chất tự sự rất riêng trong âm nhạc',
        content: 'Âm nhạc của Đen Vâu thường bắt đầu từ những quan sát đời thường: một chuyến đi, góc phố quen hay câu chuyện của những người bình dị. Ca từ gần gũi, cách kể chậm rãi giúp người nghe tìm thấy một phần trải nghiệm của mình trong mỗi bài hát. Sự mộc mạc ấy tạo nên dấu ấn riêng giữa thị trường âm nhạc luôn thay đổi. Bài viết nhìn lại cách Đen dùng những điều giản dị để kể câu chuyện có sức lan tỏa.',
        image: denVauImage,
        author: 'Ban biên tập',
        date: '10/10/2026',
        comments: [],
        likes: []
    },
    {
        id: 9002,
        title: 'Sơn Tùng M-TP: Dấu ấn của một nghệ sĩ đại chúng',
        content: 'Từ âm nhạc đến hình ảnh sân khấu, Sơn Tùng M-TP luôn tạo ra những chủ đề được khán giả quan tâm. Mỗi sản phẩm mới thường đi cùng phần phối khí bắt tai, cách xây dựng hình ảnh chỉn chu và chiến lược phát hành được tính toán kỹ. Hành trình ấy cho thấy vai trò của việc kết hợp âm nhạc, trình diễn và truyền thông trong việc tạo nên một nghệ sĩ đại chúng có sức ảnh hưởng.',
        image: sonTungImage,
        author: 'Ban biên tập',
        date: '08/10/2026',
        comments: [],
        likes: []
    },
    {
        id: 9003,
        title: 'Nhạc Việt và thế hệ nghệ sĩ trẻ đang tạo màu sắc mới',
        content: 'Thế hệ nghệ sĩ trẻ đang thử nghiệm nhiều chất liệu, kết hợp âm hưởng truyền thống với pop, R&B và indie. Cùng với nền tảng số, nghệ sĩ có thêm cơ hội đưa sản phẩm đến gần người nghe và xây dựng cộng đồng riêng. Những thử nghiệm này làm bức tranh nhạc Việt thêm đa dạng, đồng thời mở ra nhiều cách kể chuyện mới bằng âm nhạc.',
        image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=85',
        author: 'Ban biên tập',
        date: '05/10/2026',
        comments: [],
        likes: []
    },
    {
        id: 9004,
        title: 'Mỹ Tâm: sức bền của một giọng ca được nhiều thế hệ yêu mến',
        content: 'Qua nhiều giai đoạn của nhạc Việt, Mỹ Tâm vẫn giữ được sự gần gũi với khán giả nhờ giọng hát giàu cảm xúc và tinh thần làm nghề bền bỉ. Những ca khúc quen thuộc được người nghe thuộc lòng, trong khi mỗi lần xuất hiện cô vẫn mang đến năng lượng sân khấu riêng. Bài viết điểm lại hành trình xây dựng vị trí của một giọng ca được nhiều thế hệ yêu mến.',
        image: myTamImage,
        author: 'Ban biên tập', date: '03/10/2026', comments: [], likes: []
    },
    {
        id: 9005,
        title: 'Hoàng Thùy Linh đưa chất liệu dân gian vào nhạc pop',
        content: 'Hoàng Thùy Linh tạo dấu ấn bằng cách đặt những hình ảnh và âm thanh gợi nhắc văn hóa Việt trong một không gian pop hiện đại. Phần hòa âm, vũ đạo và mỹ thuật sân khấu thường được kết nối thành một câu chuyện thống nhất. Cách làm này giúp các sản phẩm của cô vừa có màu sắc riêng vừa mở ra cuộc trò chuyện về cách chất liệu truyền thống tiếp tục sống trong đời sống hôm nay.',
        image: 'https://kenh14cdn.com/203336854389633024/2026/3/13/56100672413661750648709234330559827222672754n-234839-1773422660599-17734226711631668251072.jpeg',
        author: 'Ban biên tập', date: '01/10/2026', comments: [], likes: []
    },
    {
        id: 9006,
        title: 'Hà Anh Tuấn và những đêm nhạc kể chuyện bằng cảm xúc',
        content: 'Các đêm nhạc của Hà Anh Tuấn thường được xây dựng như một cuộc gặp gỡ thân mật với khán giả. Bên cạnh những bản phối được chăm chút, cách anh kết nối các ca khúc thành một mạch chuyện tạo nên trải nghiệm đáng nhớ. Từ sân khấu lớn đến những không gian gần gũi, giọng hát và phong thái điềm đạm vẫn là điểm tựa của chương trình.',
        image: 'https://static2.yan.vn/YanNews/2167221/202506/ha-anh-tuan-dua-live-concert-sketch-a-rose-den-my-9ac945d9.png',
        author: 'Ban biên tập', date: '28/09/2026', comments: [], likes: []
    },
    {
        id: 9007,
        title: 'Vũ. và sức hút của những bản indie thủ thỉ',
        content: 'Những sáng tác của Vũ. thường mang màu sắc tự sự, chọn cách kể nhẹ nhàng về tình yêu, ký ức và những đổi thay trong cuộc sống. Giai điệu mộc mạc cùng ca từ gần gũi khiến nhiều ca khúc trở thành lựa chọn quen thuộc trong những buổi nghe nhạc riêng tư. Sự kết nối ấy cho thấy sức sống của dòng indie khi người nghệ sĩ giữ được tiếng nói chân thành của mình.',
        image: 'https://afamilycdn.com/150157425591193600/2022/9/30/tuj90411-1664509054180-16645090544422121805701.jpg',
        author: 'Ban biên tập', date: '25/09/2026', comments: [], likes: []
    },
    {
        id: 9008,
        title: 'HIEUTHUHAI và làn gió mới của rap đại chúng',
        content: 'HIEUTHUHAI là một trong những gương mặt đưa rap đến gần hơn với khán giả trẻ qua giai điệu dễ nhớ, phong cách trình diễn tự tin và hình ảnh được xây dựng nhất quán. Khi rap kết hợp với pop, ranh giới thể loại trở nên linh hoạt hơn và mở rộng tệp người nghe. Bài viết nhìn vào những yếu tố giúp một nghệ sĩ trẻ tạo được dấu ấn trong thị trường cạnh tranh.',
        image: 'https://cdn.tienphong.vn/images/bdfc554ea35983ad68a96e0050b6e2cb035dd9e97c62b06a68df6aa35af397b2188d227d0eb41235e9549f05b4208eb83903b22122a28032be2306122805d08db24b0cd2dfddcba1a5cbc673ea86aa8caeb0a29489a00bce1e9defaa6f9529870622dae4b979424198a112af55413ea0/547528032-1261146835812545-6197205715368656551-n-copy.jpg.webp',
        author: 'Ban biên tập', date: '22/09/2026', comments: [], likes: []
    },
    {
        id: 9009,
        title: 'Phương Mỹ Chi làm mới âm hưởng dân ca cho khán giả trẻ',
        content: 'Từ hình ảnh gắn với dân ca, Phương Mỹ Chi từng bước thử nghiệm những cách phối khí và phong cách biểu diễn mới. Nền tảng giọng hát giúp cô giữ được nét riêng, còn các dự án gần đây cho thấy sự chủ động khám phá những thể loại khác nhau. Hành trình ấy gợi ra cách một nghệ sĩ trẻ có thể làm mới hình ảnh mà vẫn trân trọng điểm xuất phát của mình.',
        image: 'https://kenh14cdn.com/203336854389633024/2026/1/28/ngang-2-mb-1769603616505339898216.jpg',
        author: 'Ban biên tập', date: '19/09/2026', comments: [], likes: []
    },
    {
        id: 9010,
        title: 'Tóc Tiên biến sân khấu pop thành tuyên ngôn cá tính',
        content: 'Tóc Tiên thường tạo sự chú ý bằng những màn trình diễn giàu năng lượng và phong cách thời trang nổi bật. Trên sân khấu, phần vũ đạo, ánh sáng và âm nhạc được kết hợp để làm rõ cá tính của từng tiết mục. Khả năng biến đổi hình ảnh qua các dự án giúp cô duy trì sức hút và đem lại nhiều màu sắc cho nhạc pop Việt.',
        image: 'https://i.imgur.com/IUavzDfl.png',
        author: 'Ban biên tập', date: '16/09/2026', comments: [], likes: []
    },
    {
        id: 9011,
        title: 'Bích Phương và cách kể chuyện duyên dáng qua nhạc pop',
        content: 'Bích Phương xây dựng màu sắc riêng bằng những ca khúc pop bắt tai cùng cách kể chuyện dí dỏm, gần gũi. Hình ảnh trong các sản phẩm thường có ý tưởng rõ ràng, tạo thêm điểm nhấn bên cạnh phần âm nhạc. Sự kết hợp giữa giai điệu dễ nhớ và cá tính hài hước giúp cô giữ được nét nhận diện riêng trong lòng khán giả.',
        image: 'https://i.scdn.co/image/ab6761610000e5eb906404e01b48537145d163ba',
        author: 'Ban biên tập', date: '13/09/2026', comments: [], likes: []
    },
    {
        id: 9012,
        title: 'Tlinh và tiếng nói tự tin của nghệ sĩ nữ trẻ',
        content: 'Tlinh kết hợp rap, R&B và pop với lối thể hiện tự tin, tạo nên màu sắc nổi bật trong thế hệ nghệ sĩ mới. Ca từ thường mang góc nhìn cá nhân, còn cách trình diễn giàu năng lượng giúp các ca khúc có đời sống riêng trên sân khấu. Những thử nghiệm của cô góp phần làm phong phú thêm hình dung về nghệ sĩ nữ trong nhạc Việt đương đại.',
        image: 'https://thethaovanhoa.mediacdn.vn/372676912336973824/2023/3/13/3350681309026357907812937332708030281354975n-16786796828241210474643.jpeg',
        author: 'Ban biên tập', date: '10/09/2026', comments: [], likes: []
    }
]

export function getPostImage(post) {
    const title = (post?.title || '').toLowerCase()
    const matchingSample = SAMPLE_POSTS.find(sample => {
        const sampleTitle = sample.title.toLowerCase()
        return (sampleTitle.includes('đen vâu') && title.includes('đen vâu')) ||
            (sampleTitle.includes('sơn tùng m-tp') && title.includes('sơn tùng')) ||
            (sampleTitle.includes('mỹ tâm') && title.includes('mỹ tâm'))
    })

    return matchingSample?.image || post?.image || ''
}

export function seedSamplePosts() {
    const posts = readPosts()
    const existingIds = new Set(posts.map(post => post.id))
    const missingPosts = SAMPLE_POSTS.filter(post => !existingIds.has(post.id))
    const sampleImages = new Map(SAMPLE_POSTS.map(post => [post.id, post.image]))
    let changed = missingPosts.length > 0

    const refreshedPosts = posts.map(post => {
        const image = sampleImages.get(post.id) || getPostImage(post)
        if (!image || post.image === image) return post
        changed = true
        return { ...post, image }
    })

    if (changed) savePosts([...refreshedPosts, ...missingPosts])
}

export function readPosts() {
    try {
        const posts = JSON.parse(localStorage.getItem(POSTS_KEY) || '[]')
        return Array.isArray(posts) ? posts : []
    } catch {
        return []
    }
}

export function savePosts(posts) {
    if (!Array.isArray(posts)) return false

    try {
        localStorage.setItem(POSTS_KEY, JSON.stringify(posts))
        return true
    } catch {
        return false
    }
}

export function getPostCategory(post) {
    const text = `${post?.title || ''} ${post?.content || ''}`.toLowerCase()

    if (/ca sĩ|ca nhạc|âm nhạc|album|bài hát|concert|singer|rap|r&b|\bpop\b|indie|dân ca|giọng ca|giai điệu/.test(text)) return 'Âm nhạc'
    if (/phim|diễn viên|đạo diễn|phòng vé|cinema|movie|drama/.test(text)) return 'Phim ảnh'
    if (/thời trang|fashion|phong cách|outfit|làm đẹp|makeup/.test(text)) return 'Thời trang & Làm đẹp'
    if (/tin sao|nghệ sĩ|showbiz|scandal|hẹn hò|đám cưới|sao việt|người nổi tiếng/.test(text)) return 'Tin sao'

    return 'Đời sống nghệ sĩ'
}

export function getReadingMinutes(content) {
    const wordCount = (content || '').trim().split(/\s+/).filter(Boolean).length
    return Math.max(1, Math.ceil(wordCount / 200))
}

export function getExcerpt(content, maxLength = 120) {
    const text = content || ''
    return text.length > maxLength
        ? `${text.substring(0, maxLength).trim()}...`
        : text
}
