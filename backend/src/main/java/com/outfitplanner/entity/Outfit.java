@Entity
@Table(name = "outfits")
@Getter
@Setter
@NoArgsConstructor
public class Outfit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String occasion;

    private String weather;

    private String style;

    @Column(columnDefinition = "TEXT")
    private String recommendation;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}